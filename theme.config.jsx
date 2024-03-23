import { useRouter } from "next/router";
import { useConfig } from 'nextra-theme-docs'

const githubImageURL = {
  "tony" : "https://github.com/taemin-jang.png",
  "worker" : "https://github.com/goldmayo.png",
  "epik" : "https://github.com/BoubleJ.png",
  "hyeonzii": "https://github.com/hyeonzii.png",
  "kolin": "https://github.com/hyeonzii.png",
  "moana": "https://github.com/Joseunghyo7742.png",
  "bella": "https://github.com/yunjiisy.png",
  "oliv": "https://github.com/busy-joj.png",
  "may": "https://github.com/p-so-yeon.png"
}

const DEFAULT_LOCALE = 'ko-KR';

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
      <meta property="og:title" content="리액트 스터디" />
      <meta
        property="og:description"
        content="리액트 스터디를 통해 리액트의 기본 개념을 습득하고 정리 및 발표하여 최종적으로 완독하는 것입니다."
      />
    </>
  ),
   gitTimestamp: function GitTimestamp({ timestamp }) { 
    const { locale = DEFAULT_LOCALE } = useRouter();
    return (
      <>
      {
        timestamp && 
        (<p>Last updated on{' '}
          <time dateTime={timestamp.toISOString()}>
            {timestamp.toLocaleDateString(locale, {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </time>
        </p>)
      }
      </>
    )
  },
  main: ({children}) => {
    const { frontMatter, gitTimestamp: TimeTable } = useConfig();
    return (
      <div>
        {
        frontMatter.writer &&
        <div style={{display: "flex", gap: "16px", marginTop: "16px"}}>
          <img src={githubImageURL[frontMatter.writer]} width="48" height="40" style={{borderRadius: "50%"}} />
          <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <strong>{frontMatter.writer}</strong>
            <TimeTable/>
          </div>
        </div>
        }
        {children}
      </div>
    )
  }
  
};
