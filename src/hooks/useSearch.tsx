import { Toast, showToast } from "@raycast/api";
import { superfetch } from "api/superfetch";
import React from "react";

import { getSupernotesPrefs } from "utils/helpers";
import { ICardCollection } from "utils/types";

const useSearch = (callback: (cards?: ICardCollection) => void) => {
  const { apiKey } = getSupernotesPrefs();

  const [loading, setLoading] = React.useState(true);
  const abortRef = React.useRef<AbortController | null>(null);

  try {
    React.useEffect(() => {
      search("");
      return () => {
        abortRef.current?.abort();
      };
    }, []);

    const search = async (searchTerm: string) => {
      abortRef.current?.abort();
      abortRef.current = new AbortController();
      if (searchTerm === "") {
        setLoading(false);
        callback(undefined);
        return;
      }
      try {
        setLoading(true);
        const fetched = await superfetch("/v1/cards/get/select", "post", {
          apiKey,
          signal: abortRef.current?.signal,
          body: {
            search: searchTerm,
            include_membership_statuses: [1, 2],
          },
        });
        setLoading(false);
        if (!fetched.ok) throw new Error(fetched.body.detail);
        callback(fetched.body);
      } catch (error) {
        showToast(Toast.Style.Failure, "Failed to perform search", String(error));
      }
    };
    return {
      loading,
      search,
    };
  } catch (error) {
    showToast({ style: Toast.Style.Failure, title: String(error) });
    return {
      search: () => ({}),
      loading: false,
    };
  }
};

export default useSearch;
