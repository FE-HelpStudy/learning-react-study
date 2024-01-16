import { useRouter } from "next/router";
export default {
  logo: <strong>Learning React Book Study</strong>,
  project: {
    link: "https://github.com/FE-HelpStudy/learning-react-study",
  },
  sidebar: {
    titleComponent({ title }) {
      return (
        <div
          style={{
            fontSize: ".8rem",
          }}
        >
          {title}
        </div>
      );
    },
    defaultMenuCollapseLevel: 1,
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath === "/") {
      return {
        titleTemplate: "Learning React Study",
      };
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="리액트를 다루는 기술 스터디" />
      <meta
        property="og:description"
        content="리액트를 다루는 기술을 통해 리액트의 기본 개념을 습득하고 정리 및 발표하여 최종적으로 완독하는 것입니다."
      />
    </>
  ),
};
