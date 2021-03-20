import { frFr_account } from "./account";
import { frFr_avatorDropMenu } from "./user/avatorDropMenu";
import { frFr_tagsViewDropMenu } from "./user/tagsViewDropMenu";
import { frFr_title } from "./user/title";
import { frFr_globalTips } from "./global/tips";
import { frFr_permissionRole } from "./permission/role";
import { frFr_dashboard } from "./dashboard";
import { frFr_guide } from "./guide";
import { frFr_documentation } from "./documentation";
import { frFr_auth } from "./auth";

const fr_FR = {
  ...frFr_account,
  ...frFr_auth,
  ...frFr_avatorDropMenu,
  ...frFr_tagsViewDropMenu,
  ...frFr_title,
  ...frFr_globalTips,
  ...frFr_permissionRole,
  ...frFr_dashboard,
  ...frFr_guide,
  ...frFr_documentation,
};

export default fr_FR;
