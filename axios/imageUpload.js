import axios from "axios";

export const SingleImageUpload = async (image) => {
  const formdata = new FormData();
  formdata.append("image", {
    uri: image.uri,
    type: `image/png`,
    name: "test.png",
  });
  console.log(formdata);
  try {
    const { data } = await axios({
      url: "https://anjelas-server.vercel.app/api/v1/admin/upload/image",
      method: "POST",
      data: formdata,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data);
    return data.imageUri;
  } catch (error) {
    console.log(error);
  }
};
export const galleryImageUpload = async (images) => {
  const links = [];
  for (img in images) {
    const formdata = new FormData();
    formdata.append("image", {
      uri: images[img].uri,
      type: `image/png`,
      name: "test.png",
    });

    const { data } = await axios({
      url: "https://anjelas-server.vercel.app/api/v1/admin/upload/image",
      method: "POST",
      data: formdata,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data);
    links.push(data.imageUri);
    console.log(links);
  }
  return links;
};
