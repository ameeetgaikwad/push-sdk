import * as PushAPI from '@pushprotocol/restapi';
import { useCallback, useContext } from 'react';
import { useChatData } from './useChatData';
import { Env } from '@pushprotocol/restapi';

export interface FetchProfileParams {
  profileId?: string;
  env?: Env;
}

const useChatProfile = () => {
  const { pushUser } = useChatData();
  const fetchChatProfile = useCallback(
    async ({
      profileId,
      //note: remove env when chat and notification component is shifted to class based
      env
    }: FetchProfileParams): Promise<any> => {
      try {
        let userReadOnly;
        if(profileId)
         userReadOnly = await pushUser!.info({ overrideAccount: profileId });
        else
         userReadOnly = await pushUser!.info();
        return userReadOnly;
      } catch (error) {
        console.log(error);
        return;
      }
    },
    []
  );

  return { fetchChatProfile };
};

export default useChatProfile;
