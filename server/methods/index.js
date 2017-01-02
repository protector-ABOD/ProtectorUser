import agents from './agents';
import matchmaker from './matchmaker';
import users from './users';

export default function () {
  agents();
  users();
  matchmaker();
}