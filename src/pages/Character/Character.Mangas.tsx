import { ICharacter } from "../../models/Character";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Card from "../../shared/Card/Card";

const CharacterMangas = ({ character }: { character: ICharacter }) => {
  return (
    <div className="character--animes lg:p-2 rounded">
      <div className="animes__list grid lg:grid-cols-4 grid-cols-2">
        {character?.media.edges
          .filter(
            (anime) =>
              !["TV", "MOVIE", "SPECIAL", "OVA", "ONE_SHOT"].includes(
                anime.node.format
              )
          )
          .slice(0, 4)
          .map((anime) => (
            <Card
              key={`characters--anime-${anime.node.id}`}
              anime={anime.node}
            />
          ))}
      </div>
      {character.media.edges.filter(
        (anime) =>
          !["TV", "MOVIE", "SPECIAL", "OVA", "ONE_SHOT"].includes(
            anime.node.format
          )
      ).length > 7 && (
        <Disclosure as={"div"} className={"w-full p-1"}>
          <DisclosurePanel className={"grid lg:grid-cols-4 grid-cols-2"}>
            {character?.media.edges
              .filter(
                (anime) =>
                  !["TV", "MOVIE", "SPECIAL", "OVA", "ONE_SHOT"].includes(
                    anime.node.format
                  )
              )
              .slice(4, 100)
              .map((anime) => (
                <Card
                  key={`characters--anime-${anime.node.id}`}
                  anime={anime.node}
                />
              ))}
          </DisclosurePanel>
          <DisclosureButton className={"text-primary px-2 py-1 black-bg"}>
            More
          </DisclosureButton>
        </Disclosure>
      )}
    </div>
  );
};

export default CharacterMangas;
