import { Toast, showToast } from "@raycast/api";
import { superfetch } from "api/superfetch";
import React from "react";

import { getSupernotesPrefs } from "utils/helpers";
import type { ICard, ISimpleCard } from "utils/types";

const useCreate = (successCallback: (card: ICard) => void) => {
  const { apiKey } = getSupernotesPrefs();

  const [loading, setLoading] = React.useState(false);

  const create = async (data: ISimpleCard) => {
    setLoading(true);
    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Creating",
      message: "Sending card to Supernotes",
    });
    try {
      const fetched = await superfetch("/v1/cards/simple", "post", {
        body: { name: data.name, markup: data.markup },
        apiKey,
      });
      if (!fetched.ok) throw new Error(fetched.body.detail);
      const wrappedCard = fetched.body[0];
      if (!wrappedCard.success) throw new Error(wrappedCard.payload);
      toast.style = Toast.Style.Success;
      toast.title = "Success";
      toast.message = "Card created";
      successCallback(wrappedCard.payload);
    } catch (err) {
      toast.style = Toast.Style.Failure;
      toast.title = "Card Creation Failed";
      toast.message = String(err);
    }
    setLoading(false);
    setTimeout(() => toast.hide(), 3000);
  };

  return { create, loading };
};

export default useCreate;
