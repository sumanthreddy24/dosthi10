import { useRef, useState } from "react";
import MenuItem from "./MenuItem";
import useOnClickOutside from "../../helpers/clickOutside";
import { deletePost, savePost } from "../../functions/post";
import { saveAs } from "file-saver";
import DownloadIcon from '@mui/icons-material/Download';

export default function PostMenu({
  postUserId,
  userId,
  imagesLength,
  setShowMenu,
  token,
  postId,
  checkSaved,
  setCheckSaved,
  images,
  postRef,
  
}) {
  const [test, setTest] = useState(postUserId === userId ? true : false);
  const menu = useRef(null);
  useOnClickOutside(menu, () => setShowMenu(false));
  
  const downloadImages = async () => {
    images.map((img) => {
      saveAs(img.url, `${img.username}.jpg`);
    });
  };
  
  const deleteHandler = async () => {
    console.log("postUserId:", postUserId);
    console.log("userId:", userId);
  
    if (postUserId !== userId) {
      window.alert("You can only delete your own posts.");
      return;
    }
  
    const res = await deletePost(postId, token);
    if (res.status === "ok") {
      postRef.current.remove();
      console.log("deleted");
    }
  };
  
  const enterFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  return (
    <ul className="post_menu" ref={menu}>
      
      
      <div className="line"></div>
      
      
      
      
      
      {imagesLength && (
        <div onClick={() => downloadImages()}>
          <MenuItem  title="Download" />
        </div>
      )}
      
     
      
     
      
      
      <div onClick={() => deleteHandler()}>
        <MenuItem
          icon="trash_icon"
          title="Delete Post"
         
        />
      </div>
      
      {!test && <div className="line"></div>}
      
      {!test && (
        <MenuItem
          img="../../../icons/report.png"
          title="Report post"
          subtitle="i'm concerned about this post"
        />
      )}
    </ul>
  );
}
