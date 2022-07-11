import { Action, ActionPanel, Color, Icon, List } from "@raycast/api";
import { useRecentRemover } from "../hooks/useRecent";

import { ColorMap } from "../util/mapping";
import { ICard } from "../util/types";
import CardDetail from "./CardDetail";

interface CardListItemProps {
  card: ICard;
  refreshList?: () => void;
}

const CardListItem = ({ card, refreshList }: CardListItemProps) => {
  const { found, removeFromRecents } = useRecentRemover(card);

  return (
    <List.Item
      title={card.data.name}
      icon={{
        source: Icon.TextDocument,
        tintColor: card.membership.color ? ColorMap[card.membership.color] : Color.SecondaryText,
      }}
      actions={
        <ActionPanel>
          <Action.Push title="View Card" icon={Icon.TextDocument} target={<CardDetail card={card} />} />
          <Action.CopyToClipboard title="Copy HTML" icon={Icon.Clipboard} content={card.data.html} />
          <Action.CopyToClipboard title="Copy Markdown" icon={Icon.Clipboard} content={card.data.markup} />
          {found && (
            <Action
              title="Remove from Recents"
              icon={Icon.XmarkCircle}
              onAction={() => {
                removeFromRecents();
                refreshList && refreshList();
              }}
            />
          )}
        </ActionPanel>
      }
    />
  );
};

export default CardListItem;
