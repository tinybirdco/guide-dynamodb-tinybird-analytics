import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const Header = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex justify-between items-center h-[68px] px-12 w-full bg-white",
        className
      )}
    >
      <div className="flex items-center gap-1">
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g clipPath="url(#clip0_36_36)">
            <rect
              width="24"
              height="24"
              transform="translate(0.384766)"
              fill="url(#pattern0_36_36)"
            />
            <rect x="0.384277" width="24" height="24" fill="white" />
            <path
              opacity="0.6"
              d="M24.3839 2.05498L16.8915 0L14.2554 5.89094L24.3839 2.05498Z"
              fill="#2F80ED"
            />
            <path
              opacity="0.6"
              d="M17.3379 16.5173L10.5093 13.7457L6.32861 24.0003L17.3379 16.5173Z"
              fill="#2F80ED"
            />
            <path
              d="M0.384277 10.5564L17.2197 16.5817L19.9807 3.70898L0.384277 10.5564Z"
              fill="#2F80ED"
            />
          </g>
          <defs>
            <pattern
              id="pattern0_36_36"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use xlinkHref="#image0_36_36" transform="scale(0.015625)" />
            </pattern>
            <clipPath id="clip0_36_36">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0.384766)"
              />
            </clipPath>
            <image
              id="image0_36_36"
              width="64"
              height="64"
              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQ8SURBVHgB7ZvPbltVEMa/uQ5S1CridkeoWt0Fe5JHQAo7aJwNKpvW4QksWFe5addg8gDgEBZhVwfYgKh4BOcRLqDS7moFgSoUn2GOkyIVNp45E/u09W/jLJK593znz8x8OQYWLFjwKkNw4Em7LDFeabeATSZak6DVtH+78tYGpob4GEwNiAb06RdfwYFkAU7eu9ZGQX35sYQBlQDPE4WoU4UokMDJjes9Gfx9GAefSAXmff74ox0kYBbgjxvX44O7mD+1iNCDEZMAJ+9f67A8GPnQ5U86bRiwrQCipGV3IXDR525HvRXVAsTZh+KUnyElikK9CiwrYBO5wnzxAhBRhVwhehtK1ALI4beGfKmgJKkOeBmwCNAgV2KprEQvAOsfMjMCfoESywo4Qr7cV/6+XoBxqzWQjxGygxvq9dWNkVqAK4NmNA68jdxgW2luygJXvv9tIOlwD7nA2LXMfsScBl//9teuiLCLecO8R70vaxhJqgNEhHrMvM1zSY08AoUtmfmkltzFEos8kSapVRSbzFyRolrUOULcyCtLGg5HkvIG9Pl+8mG8BAf6bS6/W8YzOVUt6a3P6H+TUP7M5XIYtwsWQQlrxP+WuJMBk1Q8DzfIJRMlr4CDD6QDW0JfDiKTLXbr8HkBVn84bVOrmMZjbESIWoSYnyd48CH30JLig308wasPuCeDn9ZjrBi8/+YDno8n+PVNdvUE40Dk/NDHY65XRTgYMQlwcJM7sjdrOHH1x9NOHAiMkAi3+tPpLD1BuHqCXBTJ8QhFPx6eUKIWIM4+HD3Byez7xCsvS+aAEv0KIF9PUGbfLR6H2ZiiFXyp4AXh4j1B+HuCnvEqKFl4gtDTwBNyjMc0A08Q8PUE2TMez8ATZF9PkCi4xQtEM/AElzGQKtDNE3yt8PEYoyfx2NAYqQXY3qdRYLh5gs07NGKE5HgsnSEMmLLA9iG5eoKPNpYGBLbHY959bGyLzWnw9iF1mf08wYcbrW4cCJRIS7z3+7utGkaS6oDb38iyk+3g5QnGgYQQpo034nHYehSFS8DNE5w0SdInyMurPMH/OkLPeEOapOKsT6hwHk8O30bsseMgmePpSWsw2kq3xVwEKId1+RRFWyyq+MKqe4J/rd9xmwQLyaboyvBe+2/xRYv5XJVLJukMuDy82xuf/UPyhRx8xCzApeHdHcm9OdwTTMIkgMx8B8bCIzdMAgRkeE/QiFqAOPvk6eLMGcMtMcr3nqABwxbgCi8RBgEo53uCahaeIJT4XoaY/5U7/V1hR09Q2mm1h+eNWoAAdvPwCoOH541agGUEr3uCzZ/rd1y++ZWCWoDReh0Hn+zhUSZfuTFlAenhBxSSPMHdHGY/kmRGXBreq+VD1RfIA/dk8Nl0kcluzPKkN6CdKfqDydaJqwcZ4WZHnQuxSZNS+axaPK8ZjsW5PYqH5/n5kRX/AEhaZzLFTqvqAAAAAElFTkSuQmCC"
            />
          </defs>
        </svg>
        <div className="text-[#1B1F2D] text-[18px] font-bold tracking-[0.36px]">
          Tinyflights
        </div>
      </div>
    </div>
  );
};

export default Header;
