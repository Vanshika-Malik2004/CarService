import { React, useState, useEffect } from "react";
import { supabase } from "../SupabaseConfig";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ProfileImage = ({ providerId }) => {
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    const getPreview = async () => {
      const prev = await supabase
        .from("ServiceProvider")
        .select()
        .eq("id", providerId);
      if (prev.data[0].ProfilePic) {
        const { data } = await supabase.storage
          .from("ProviderProfilePicture")
          .getPublicUrl(
            "profile/" + providerId + "/" + prev.data[0].ProfilePic
          );
        console.log(data);

        setPreview(data.publicUrl);
      }
    };
    getPreview();
  }, []);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const upload = async (file) => {
    // console.log(providerId);
    const prev = await supabase
      .from("ServiceProvider")
      .select()
      .eq("id", providerId);
    // console.log(prev)
    if (prev.data[0].ProfilePic) {
      const { data, error } = await supabase.storage

        .from("ProviderProfilePicture")
        .remove(["profile/" + providerId + "/" + prev.data[0].ProfilePic]);
    }

    const { data, error } = await supabase.storage
      .from("ProviderProfilePicture")
      .upload("profile/" + providerId + "/" + file.name, file);
    if (error) {
      console.log(error);
      return;
    } else console.log(data);
    const imgL = await supabase
    .storage
    .from('ProviderProfilePicture')
    .getPublicUrl('profile/'+providerId+'/'+prev.data[0].ProfilePic)

    setPreview(imgL.data.publicUrl);
    // setPreview("profile/" + providerId + "/" + prev.data[0].ProfilePic);
    await supabase
      .from("ServiceProvider")
      .update({ ProfilePic: file.name })
      .eq("id", providerId)
      .select();
  };
  return (
    <div>
      {preview && <img src={preview} height={300} width={300} />}
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={(e) => upload(e.target.files[0])}
        />
      </Button>
    </div>
  );
};

export default ProfileImage;
