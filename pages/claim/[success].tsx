import { NextPage } from "next";

import Wrapper from "@components/wrapper";
import { gqlApiSdk } from "@lib/server";
import CloudImage from "@components/cloud-image";
import Minter from "@components/minter";
import Seo from "@components/seo";

interface ClaimsPageProps {
  nftTokenIds: number[];
  cloudinary_id?: string;
}

interface ClaimsPageParams {
  params: { success: string };
}

const ClaimFlow: NextPage<ClaimsPageProps> = ({
  nftTokenIds,
  cloudinary_id,
}) => {
  const tokenId = nftTokenIds[0]; // @TODO: for now, take the first, but handle multiple soon

  return (
    <Wrapper>
      <Seo title="Claim Your NFT Treasure!" />

      <div className="flex flex-col items-center text-center">
        {cloudinary_id && (
          <CloudImage height={260} width={260} id={cloudinary_id} />
        )}

        <Minter tokenId={tokenId} gatedIds={[]} />
      </div>
    </Wrapper>
  );
};

export default ClaimFlow;

export async function getStaticProps({
  params: { success },
}: ClaimsPageParams): Promise<{ props: ClaimsPageProps }> {
  const gql = await gqlApiSdk();

  const { nfts } = await gql.GetNftIdByPuzzleSuccessRoute({
    successRoute: success,
  });
  const nftTokenIds = nfts.map((nft) => nft.tokenId);

  const { puzzles } = await gql.PuzzleInfoBySuccess({ success });

  const nft = puzzles.length ? puzzles[0].nft : null;

  return {
    props: {
      nftTokenIds,
      cloudinary_id: nft?.nft_metadatum?.cloudinary_id || "",
    },
  };
}

export async function getStaticPaths() {
  const gql = await gqlApiSdk();
  const { nfts } = await gql.GetAllNftClaims();

  // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
  const paths = nfts.map((nft) => ({
    params: {
      success: nft.puzzle.success_route,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
