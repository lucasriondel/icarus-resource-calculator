import styled from "@emotion/styled";
import Image from "next/image";
import { devGothic } from "../assets/fonts";
import { Craftable, CraftItem } from "../data";
import { getResourceFromResourceId } from "../data/helper";

const MainContainer = styled.div`
  flex-basis: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
  max-width: 300px;
  border: 1px solid #5c84a4;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

const Header = styled.div`
  color: #5c84a4;
  background-color: #13192a;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const CraftImageContainer = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #5c84a4;
  background-color: #13192a;
`;

const Recipe = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin: 0 auto;
  gap: 16px;
`;

const RecipeItem = styled.div`
  position: relative;
  border: 1px solid #a3d13c;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AmountRecipeItemContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #a3d13c;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

const AmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const AmountInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const RemoveButton = styled.button`
  height: 30px;
  width: 104px;

  font-family: ${devGothic.style.fontFamily};
  font-size: 1.25rem;

  border: 1px solid #5c84a4;
  color: #5c84a4;
  background-color: #13192a;

  &:focus {
    border: 1px solid #7b8c99;
  }

  &:hover {
    color: #13192a;
    background-color: #5c84a4;
  }

  &:active {
    color: #5c84a4;
    background-color: #13192a;
  }
`;

const AmountButton = styled(RemoveButton)`
  width: 30px;
`;

const AmountInput = styled.input`
  height: 30px;
  width: 104px;
  border: 1px solid #5c84a4;
  color: #5c84a4;
  background-color: #13192a;
  font-family: ${devGothic.style.fontFamily};
  font-size: 1.5rem;
  padding: 8px;
`;

interface SelectedCraftableProps {
  craftable: Craftable;
  amount: number;
  onAmountChange: (amount: number) => void;
  onRemove: () => void;
}

export const SelectedCraftable = ({
  craftable,
  amount,
  onAmountChange,
  onRemove,
}: SelectedCraftableProps) => {
  return (
    <MainContainer>
      <Header>{craftable.name}</Header>

      <ContentContainer>
        <CraftImageContainer>
          <Image
            src={craftable.imageUrl || "/images/placeholder.png"}
            alt={craftable.name}
            width={100}
            height={100}
          />
        </CraftImageContainer>

        <AmountContainer>
          <AmountInputContainer>
            <AmountButton
              onClick={() => {
                onAmountChange(amount - 1 < 1 ? 1 : amount - 1);
              }}
            >
              {"<"}
            </AmountButton>
            <AmountInput
              type="number"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const newAmount = parseInt(e.currentTarget.value);
                onAmountChange(newAmount < 1 ? 1 : newAmount);
              }}
            />
            <AmountButton
              onClick={() => {
                onAmountChange(amount + 1);
              }}
            >
              {">"}
            </AmountButton>
          </AmountInputContainer>

          <RemoveButton onClick={onRemove}>Remove</RemoveButton>
        </AmountContainer>

        <Recipe>
          {(craftable.craft ?? []).map((resourceOrOption, index) => {
            if (Array.isArray(resourceOrOption)) {
              return null;
            } else {
              const craftItem = resourceOrOption as CraftItem;
              const resource = getResourceFromResourceId(craftItem.id);
              return (
                <RecipeItem key={index}>
                  <AmountRecipeItemContainer>
                    {amount * craftItem.amount}/{craftItem.amount}
                  </AmountRecipeItemContainer>
                  <Image
                    src={resource.imageUrl || "/images/placeholder.png"}
                    alt={resource.name}
                    width={55}
                    height={55}
                  />
                </RecipeItem>
              );
            }
          })}
        </Recipe>
      </ContentContainer>
    </MainContainer>
  );
};
