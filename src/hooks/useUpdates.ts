import { showToast } from "@/components/toast/ShowToast";
import * as Updates from "expo-updates";
import { useEffect } from "react";

export default function useUpdates() {
  const { isUpdateAvailable } = Updates.useUpdates();

  useEffect(() => {
    if (isUpdateAvailable) {
      Updates.fetchUpdateAsync()
        .then(() => {
          showToast(
            "info",
            "Update available",
            "Reload the app to update to the latest version."
          );
        })
        .catch(() => {
          showToast(
            "error",
            "Update error",
            "An error occurred while checking for updates."
          );
        });
    }
  }, [isUpdateAvailable]);
}
