import RadioGroupDevices from "./RadioGroupDevices";
import { CardEstablishment } from "./CardEstablishment";
import CardPlaylist from "./CardPlaylist";
import { GetEstablishment } from "../../../../api/services/EstablishmentService";
import { OwnerType } from "../../../../@types/OwnerType";
import { Skeleton } from "@chakra-ui/react";

type Props = {
  owner: OwnerType;
};

const Establishment = ({ owner }: Props) => {
  const { data, isLoading, isError } = GetEstablishment();

  if (isLoading) return <Skeleton width="100%" height="80px"></Skeleton>;

  if (isError) return <div>Não foi possível carregar este componente.</div>;

  return (
    <>
      <span className="text-muted font-medium">Ambiente</span>
      <div className="mb-5">
        <CardEstablishment establishment={data?.data} />
      </div>

      {owner?.hasThirdPartyAccess && (
        <>
          <span className="text-muted font-medium">
            Dispositivos disponíveis
          </span>
          <div className="mb-5 bg-tinnyGray p-4 rounded-lg">
            <RadioGroupDevices deviceId={data?.data.deviceId} />
          </div>

          <span className="text-muted font-medium">Playlist</span>
          <div className="mb-5">
            <CardPlaylist />
          </div>
        </>
      )}
    </>
  );
};

export default Establishment;
