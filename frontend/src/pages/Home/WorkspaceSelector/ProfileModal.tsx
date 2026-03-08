import { useRef, useState } from "react";
import { useCurrentUserStore } from "../../../modules/auth/current-user.state";
import { useUiStore } from "../../../modules/ui/ui.state";
import { accountRepository } from "../../../modules/account/account.repository";

function ProfileModal() {
  const { setShowProfileModal } = useUiStore();
  const { currentUser, setCurrentUser } = useCurrentUserStore();
  const [name, setName] = useState(currentUser?.name || "");
  const [thumbnail, setThumbnail] = useState<File | undefined>();
  const [thumbnailUrl, setThumbnailUrl] = useState(currentUser?.thumbnailUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateProfile = async () => {
    try {
      const updatedUser = await accountRepository.updateProfile(
        name,
        thumbnail,
      );
      setCurrentUser(updatedUser);
      setShowProfileModal(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null || e.target.files[0] == null) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnail(file);
      setThumbnailUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="profile-modal-overlay"
      onClick={() => setShowProfileModal(false)}
    >
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-modal-header">
          <h2>Edit your profile</h2>
        </div>

        <div className="profile-modal-content">
          <div className="profile-form">
            <div className="profile-form-left">
              <div className="form-group">
                <label htmlFor="fullName">Full name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="profile-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="profile-form-right">
              <div className="profile-photo-section">
                <label>Profile photo</label>
                <div className="profile-photo-container">
                  {thumbnailUrl == null ? (
                    <div className="profile-photo-placeholder">
                      <div className="profile-photo-circle" />
                    </div>
                  ) : (
                    <img
                      src={thumbnailUrl}
                      alt="Profile-Image"
                      className="profile-photo-preview"
                    />
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <button
                  className="upload-photo-button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Photo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-modal-footer">
          <button
            className="cancel-button"
            onClick={() => setShowProfileModal(false)}
          >
            Cancel
          </button>
          <button className="save-button" onClick={updateProfile}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProfileModal;
