import { useSetPageTitle } from "@/hooks/pages";
import TmpAuthState from "./TmpAuthState";
import TmpColors from "./TmpColors";
import TmpMarkdown from "./TmpMarkdown";
import TmpTerminal from "./TmpTerminal";
import TmpWarningBarState from "./TmpWarningBarState";
import TmpSocket from "./TmpSocket";
import TmpToasts from "./TmpToasts";
import TmpApi from "./TmpApi";
import TmpFiller from "./TmpFiller";


export default function TestingPage() {
    const setPageTitle = useSetPageTitle();
    setPageTitle();

    return <div className="flex flex-col gap-4 w-full">
        {/* <TmpFiller /> */}
        {/* <TmpApi /> */}
        {/* <TmpToasts /> */}
        {/* <TmpSocket /> */}
        {/* <TmpWarningBarState /> */}
        {/* <TmpAuthState /> */}
        {/* <TmpTerminal /> */}
        {/* <TmpMarkdown /> */}
        {/* <TmpColors /> */}
    </div>;
}
