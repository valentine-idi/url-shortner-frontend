import { type Data } from "../../services/services";

interface Props {
  recentLinks: Data[] | null;
}

function RecentLinks({ recentLinks }: Props) {
  console.log(recentLinks);
  return <div>RecentLinks</div>;
}

export default RecentLinks;
