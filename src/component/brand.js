import { StyledLink } from "./styledLink";

export default function Brand() {
  return (
    <StyledLink to="/home/1">
      <h1
        style={{
          writingMode: "vertical-lr",
          position: "absolute",
          top: 40,
          left: 10,
          color: "white",
        }}
      >
        ALBUM
      </h1>
    </StyledLink>
  );
}
