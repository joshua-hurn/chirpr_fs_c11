import { Query } from '../';
import type { TMentions } from '../models';

const all = (userid) =>
    Query<Array<TMentions>>(`
    CALL spUserMentions(${userid})
`);

const one = (name) => Query(`select users.id from users where users.name = "${name}";`)

const insert = (userid: number, chirpid: number) => Query(`insert into mentions(userid, chirpid) values(${userid}, ${chirpid});`);

export default {
    all,
    insert,
    one
};