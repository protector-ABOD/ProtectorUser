import codetables from './codetables';
import agents from './agents';
import skills from './skills';
import userprofile from './userprofile';
import user from './user';

export default function () {
  agents();
  skills();
  codetables();
  userprofile();
  user();
}
