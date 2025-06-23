// import "server-only" 이 파일이 반드시 서버에서만 동작 해야 한다고 명시하는 방법임"

import "server-only";

export default function ServerComp() {
    console.log("ServerComp");
    return (<div>
        h2
    </div>)
}