import { Action, ActionPanel, Clipboard, Icon, List, getSelectedText } from "@raycast/api";
import React from "react";

import { CardAppendListItem } from "components/CardListItem";
import { useRecentCards } from "hooks/useRecent";
import useSearch from "hooks/useSearch";
import { sendToDaily, sendToNew } from "utils/senders";
import { ICardCollection } from "utils/types";

type ClippingType = "selection" | "clipboard";

const SendClipping = () => {
  const [resultCards, setResultCards] = React.useState<ICardCollection>();
  const { search, loading: searchLoading } = useSearch((results) => setResultCards(results));

  const { cards: recentCards, loading: recentsLoading } = useRecentCards();

  const [clippingType, setClippingType] = React.useState<ClippingType>("selection");
  const [clipLoading, setClipLoading] = React.useState(false);
  const [clipping, setClipping] = React.useState<string>();
  React.useEffect(() => {
    setClipLoading(true);
    const prom = clippingType === "selection" ? getSelectedText() : Clipboard.readText();
    prom
      .then((text) => setClipping(text?.length ? text : undefined))
      .catch((err) => {
        console.log(err);
        setClipping(undefined);
      })
      .finally(() => setClipLoading(false));
  }, [clippingType]);

  const Detail = <List.Item.Detail isLoading={clipLoading} markdown={clipping} />;

  return (
    <List
      throttle
      isLoading={searchLoading || recentsLoading}
      isShowingDetail={!!clipping}
      onSearchTextChange={search}
      searchBarPlaceholder="Send your selection somewhere..."
      searchBarAccessory={
        <List.Dropdown
          tooltip="Select clipping type"
          storeValue={true}
          onChange={(value) => setClippingType(value as ClippingType)}
        >
          <List.Dropdown.Item title="selection" value="selection" />
          <List.Dropdown.Item title="clipboard" value="clipboard" />
        </List.Dropdown>
      }
    >
      {clipping ? (
        <>
          {resultCards ? (
            Object.values(resultCards).map((card) => (
              <CardAppendListItem key={card.data.id} card={card} detail={Detail} text={clipping} />
            ))
          ) : (
            <>
              <List.Item
                title="Append to daily card"
                icon={Icon.PlusCircle}
                detail={Detail}
                actions={
                  <ActionPanel>
                    <Action onAction={() => sendToDaily(clipping)} title="Append to Daily card" />
                  </ActionPanel>
                }
              />
              <List.Item
                title="Create new card"
                icon={Icon.NewDocument}
                detail={Detail}
                actions={
                  <ActionPanel>
                    <Action onAction={() => sendToNew(clipping)} title="Create new card" />
                  </ActionPanel>
                }
              />
              <List.Section title="Recent Cards">
                {recentCards?.map((card) => (
                  <CardAppendListItem
                    key={card.data.id}
                    card={card}
                    detail={Detail}
                    text={clipping}
                  />
                ))}
              </List.Section>
            </>
          )}
        </>
      ) : (
        <List.EmptyView
          icon={Icon.TextSelection}
          title={
            clippingType === "selection"
              ? "Select some text to get started"
              : "Copy text to your clipboard to get started"
          }
        />
      )}
    </List>
  );
};

export default SendClipping;
