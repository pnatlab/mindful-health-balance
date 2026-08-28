#include <limits.h>
#include <mach-o/dyld.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

static int parent_directory(char *path) {
  char *slash = strrchr(path, '/');
  if (slash == NULL || slash == path) {
    return 0;
  }
  *slash = '\0';
  return 1;
}

static void show_missing_launcher(void) {
  execl("/usr/bin/osascript", "osascript", "-e",
        "display alert \"Mindful Health Balance\" message \"The shared local launcher could not be found. Rebuild the app from the MHB repository.\" as critical buttons {\"OK\"} default button \"OK\"",
        (char *)NULL);
}

int main(void) {
  char executable_path[PATH_MAX];
  char resolved_path[PATH_MAX];
  uint32_t path_size = sizeof(executable_path);
  if (_NSGetExecutablePath(executable_path, &path_size) != 0 ||
      realpath(executable_path, resolved_path) == NULL) {
    show_missing_launcher();
    return 1;
  }

  for (int level = 0; level < 5; level++) {
    if (!parent_directory(resolved_path)) {
      show_missing_launcher();
      return 1;
    }
  }

  char launcher_path[PATH_MAX];
  if (snprintf(launcher_path, sizeof(launcher_path), "%s/tools/mhb_local_launcher.sh",
               resolved_path) >= (int)sizeof(launcher_path) ||
      access(launcher_path, X_OK) != 0) {
    show_missing_launcher();
    return 1;
  }

  setenv("MHB_LAUNCHER_UI", "app", 1);
  execl("/bin/zsh", "zsh", launcher_path, resolved_path, (char *)NULL);
  perror("Mindful Health Balance launcher");
  return 1;
}
