import { ReactNativeFile } from "extract-files";

interface CreateFileProps {
  uri: string;
  name: string;
  type: string;
}

// interface CreateFileResult {
//   file
// }

export const createFile = (props: CreateFileProps): any => {
  return new ReactNativeFile({
    uri: props.uri,
    name: props.name,
    type: props.type || "image/jpeg",
  });
};
