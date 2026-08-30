import type { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetOneGig } from "../../service/gig";
import Loader from "../../components/loader";
import Error from "../../components/error";
import BreadCrumb from "./BreadCrumb";
import GigInfo from "./GigInfo";
import UserInfo from "./UserInfo";
import PackageInfo from "./PackageInfo";

const Detail: FC = () => {
  const { id } = useParams();
  const { isLoading, error, data, refetch } = useGetOneGig(id);

  if (isLoading) return <Loader designs="my-40" />;

  if (error) return <Error message={error.message} refetch={refetch} />;

  if (!data) return <p className="warning m-10">İçerik yok veya kaldırıldı</p>;

  return (
    <div className="container max-sm:px-5">
      <div className="flex flex-col lg:flex-row gap-10 pb-10">
        <div className="overflow-y-auto">
          <BreadCrumb category={data.category} />
          <GigInfo gig={data} />
          <UserInfo user={data.user} />
        </div>

        <PackageInfo gig={data} />
      </div>
    </div>
  );
};

export default Detail;
