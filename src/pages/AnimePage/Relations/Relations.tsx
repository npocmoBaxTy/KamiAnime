import { LazyLoadImage } from "react-lazy-load-image-component";
import { IAnime } from "../../../models/Product";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { AnimatePresence, easeOut, motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

const Relations = ({
  anime,
  className,
}: {
  anime: IAnime;
  className?: string;
}) => {
  return (
    <div
      className={`anime__relations bg-gray p-1 lg:mt-5 lg:mb-0 mb-5 ${className}`}
    >
      <div className="anime__realtions--title">
        <h2 className="text-lg lg:text-xl font-bold text-primary pl-2">
          Relations
        </h2>
      </div>
      <div className="anime__realtions--item-list grid grid-cols-2 ">
        {anime.relations.edges.slice(0, 8).map((relation) => (
          <div
            key={`relation--item--${relation.node.id}`}
            className="anime__relations--item p-2"
          >
            <div className="relation__item--img h-48">
              <LazyLoadImage
                data-tooltip-id={`relation--item--${relation.node.id}`}
                src={relation.node.coverImage.large}
                alt="anime--relation--image"
                width={"100%"}
                effect="blur"
                className="block h-48 w-full object-cover"
              />
            </div>
            <div className="relation__item--title flex flex-col black-bg p-1 text-primary text-sm ">
              <h4 className="line-clamp-1">
                {relation.node.title.english || relation.node.title.romaji}
              </h4>
              <div>
                <span className="text-xs mt-1">{relation.relationType}</span>
                <span className="ml-2">{relation.node.format}</span>
              </div>
            </div>
            <Tooltip
              opacity={1}
              id={`relation--item--${relation.node.id}`}
              place="right"
              className="text-primary z-50 max-w-80 black-bg"
              key={`relation--item-tooltip--${relation.node.id}`}
            >
              <img
                src={relation.node.coverImage.large}
                className="size-80 rounded-lg"
              />
              <div className="flex flex-col px-2 gap-2 bg-gray mt-2 rounded-md text-white">
                <span className="text-lg">
                  {relation.node.title.english || relation.node.title.romaji}
                </span>
                <span>{relation.node.type}</span>
              </div>
            </Tooltip>
          </div>
        ))}
      </div>
      {anime.relations.edges.length > 8 && (
        <div className="anime__relations--accordion">
          <Disclosure as="div" defaultOpen={false}>
            <div className="overflow-hidden">
              <AnimatePresence>
                <DisclosurePanel>
                  <div className="anime__realtions--item-list grid grid-cols-2">
                    {anime.relations.edges.slice(8, 16).map((relation) => (
                      <motion.div
                        initial={{ opacity: 0, y: -24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -24 }}
                        transition={{ duration: 0.2, ease: easeOut }}
                        className="origin-top"
                        data-tooltip-id={`relation--item--${relation.node.id}`}
                      >
                        <div
                          key={`relation--item--${relation.node.id}`}
                          className="anime__relations--item p-2"
                        >
                          <div className="relation__item--img h-48">
                            <LazyLoadImage
                              src={relation.node.coverImage.large}
                              alt="anime--relation--image"
                              width={"100%"}
                              effect="blur"
                              className="block h-48 w-full object-cover"
                            />
                          </div>
                          <div className="relation__item--title flex flex-col black-bg text-primary text-sm ">
                            <h4 className="line-clamp-1">
                              {relation.node.title.english ||
                                relation.node.title.romaji}
                            </h4>
                            <span className="text-xs mt-1">
                              {relation.relationType}
                            </span>
                          </div>
                          <Tooltip
                            opacity={1}
                            id={`relation--item--${relation.node.id}`}
                            place="right"
                            className="text-primary z-50 max-w-80 black-bg"
                            key={`relation--item-tooltip--${relation.node.id}`}
                          >
                            <img
                              src={relation.node.coverImage.large}
                              className="size-80 rounded-lg"
                            />
                            <div className="flex flex-col px-2 gap-2 bg-gray mt-2 rounded-md text-white">
                              <span className="text-lg">
                                {relation.node.title.english ||
                                  relation.node.title.romaji}
                              </span>
                              <span>{relation.node.type}</span>
                            </div>
                          </Tooltip>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </DisclosurePanel>
              </AnimatePresence>
            </div>
            <DisclosureButton className="group flex w-full items-center justify-between">
              <span className="text-sm/6 black-bg text-primary cursor-pointer rounded ml-2 inline-block px-2 py-1 font-medium text-primary">
                More
              </span>
            </DisclosureButton>
          </Disclosure>
        </div>
      )}
    </div>
  );
};

export default Relations;
