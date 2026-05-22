import type { RestRequestData } from "../..";

interface HypeSquadOnlineBody {
    /**
     * @description The hypesquad house id
     *
     * * 1 sets hypesquad to **Bravery**
     * * 2 sets hypesquad to **Brilliance**
     * * 3 sets hypesquad to **Balance**
     * @satisfies Value must be one of (1, 2, 3) if invalid.
     */
    house_id: 1 | 2 | 3;
}

/**
 * Allowed methods: `post`, `del`
 */
export interface HypeSquadOnlinePayload extends RestRequestData<"/hypesquad/online"> {
    body?: HypeSquadOnlineBody;
}
