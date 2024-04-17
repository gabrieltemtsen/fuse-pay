const apiToken = process.env.NEXT_APP_LIGHTHOUSE_IPFS_KEY;
import lighthouse from "@lighthouse-web3/sdk";

// export const getJSONFromFileinCID = async (_cid: string) => {
//   const res = await client.get(_cid);
//   if (res) {
//     const filesArr = await res.files(); // Web3File[]
//     let abc = filesArr[0].cid;
//     const data = await fetch(`https://${abc}.ipfs.w3s.link`).then((dets) =>
//       dets.json(),
//     );
//     return data;
//   }
// };

// export const getJSONFromCID = async (_cid: any) => {
//   const json = await client.get(_cid);
//   if (!json) {
//     // handle the case where `json` is null
//     throw new Error("Unable to get JSON from CID");
//   }
//   const filesArr = await json.files(); // Web3File[]
//   let abc = filesArr[0].cid;
//   const data = await fetch(`https://${abc}.ipfs.w3s.link`).then((dets) =>
//     dets.json(),
//   );
//   return data;
// };

// export const putFileandGetHash = async (file: any) => {
//   const content = new Blob([file], { type: "application/json" });
//   const fileObj = new File([content], "file", {
//     type: "application/json",
//   });
//   const res = await client.put([fileObj], { wrapWithDirectory: false });
//   return res;
// };

export const putJSONandGetHash = async (json: any, name?: any) => {
  console.log("Uploading JSON to IPFS");
  // const content = new Blob([JSON.stringify(json)], {
  //   type: "application/json",
  // });
  // const fileObj = new File([content], "file.json", {
  //   type: "application/json",
  // });
  const fileObj = JSON.stringify(json);

  const output = await lighthouse.uploadText(
    fileObj,
    "48248fef.37aaeee86c6b441f826a347ee23731e4",
    name,
  );

  console.log("Got JSON and uploaded to IPFS");
  return output.data.Hash;
};

export const pushImgToStorage = async (file) => {
  console.log("triggered");
  console.log(file);
  const output = await lighthouse.upload(
    file,
    `48248fef.37aaeee86c6b441f826a347ee23731e4`,
    false,
    null,
  );
  console.log(output);
  return output.data.Hash;
};
