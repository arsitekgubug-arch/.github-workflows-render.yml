import { Composition } from "remotion";
import { BuildingCollapseShorts } from "./BuildingCollapseShorts";

export const Root = () => {
  return (
    <Composition
      id="BuildingCollapseShorts"
      component={BuildingCollapseShorts}
      durationInFrames={2160}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
