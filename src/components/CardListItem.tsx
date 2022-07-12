import { Action, ActionPanel, Color, Icon, List } from "@raycast/api";

import { ColorMap } from "../util/mapping";
import { ICard } from "../util/types";
import CardDetail from "./CardDetail";
import CommonCardActions from "./CommonCardActions";

interface CardListItemProps {
  card: ICard;
  refreshList?: () => void;
}

const CardListItem = ({ card, refreshList }: CardListItemProps) => {
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
          <CommonCardActions card={card} refreshList={refreshList} />
        </ActionPanel>
      }
    />
  );
};

export default CardListItem;
