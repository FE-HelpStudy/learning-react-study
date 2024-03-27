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
  "may": "https://github.com/p-so-yeon.png",
  "deon": "https://github.com/kimdoyeonn.png"
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
    // const { frontMatter, gitTimestamp: TimeTable } = useConfig();
    const config = useConfig();
    const frontMatter = config.frontMatter;
    const TimeTable = config.gitTimestamp;
    return (
      <div>
        {
        frontMatter.writer &&
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px"}}>
          <div style={{display: "flex", gap: "16px"}}>
            <img src={githubImageURL[frontMatter.writer]} width="48" height="40" style={{borderRadius: "50%"}} />
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
              <strong>{frontMatter.writer}</strong>
              <TimeTable/>
            </div>
          </div>
          <div style={{display: "flex"}}>
            <a href={githubImageURL[frontMatter.writer].replace(/\.png$/, '')} target="_blank" rel="noreferrer" class="nx-p-2 nx-text-current">
              <svg width="24" height="24" fill="currentColor" viewBox="3 3 18 18">
                <title>GitHub</title>
                <path d="M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z"></path>
              </svg>
              <span class="nx-sr-only">GitHub</span>
              <span class="nx-sr-only nx-select-none">(opens in a new tab)</span>
            </a>
            {frontMatter?.velog &&
              <a href={frontMatter.velog} target="_blank" rel="noreferrer" class="nx-p-2 nx-text-current">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <title>Velog</title>
                  <path fill="currentColor" d="M3 0C1.338 0 0 1.338 0 3v18c0 1.662 1.338 3 3 3h18c1.662 0 3-1.338 3-3V3c0-1.662-1.338-3-3-3zm6.883 6.25c.63 0 1.005.3 1.125.9l1.463 8.303c.465-.615.846-1.133 1.146-1.553a14.1 14.1 0 0 0 1.283-2.273c.405-.855.608-1.62.608-2.295c0-.405-.113-.727-.338-.967c-.21-.255-.608-.577-1.193-.967c.6-.765 1.35-1.148 2.25-1.148c.48 0 .878.143 1.193.428c.33.285.494.704.494 1.26c0 .93-.39 2.093-1.17 3.488c-.765 1.38-2.241 3.457-4.431 6.232l-2.227.156l-1.711-9.628h-2.25V7.24c.6-.195 1.305-.406 2.115-.63c.81-.24 1.358-.36 1.643-.36"/>
                </svg>
                <span class="nx-sr-only">Velog</span>
                <span class="nx-sr-only nx-select-none">(opens in a new tab)</span>
              </a>
            }
          </div>
        </div>
        }
        {children}
      </div>
    )
  }
  
};
