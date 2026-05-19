import { RestRequestData } from "../..";

interface HypeSquadOnlineBody {
    /**
     * @description The hypesquad house id
     *
     * * 1 Changes the hypesquad to **Bravary**
     * * 2 Changes the hypesquad to **Brilliance**
     * * 3 Changes the hypesquad to **Balance**
     */
    house_id: number;
}

export interface HypeSquadOnlinePayload extends RestRequestData<"/hypesquad/online"> {
    body?: HypeSquadOnlineBody;
}
