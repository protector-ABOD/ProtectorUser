import {Mongo} from 'meteor/mongo';

export const Agents = new Mongo.Collection('Agent', {idGeneration: 'MONGO'});
export const Skills = new Mongo.Collection('Skill', {idGeneration: 'MONGO'});
export const CodeTable = new Mongo.Collection('CodeTable', {idGeneration: 'MONGO'});
export const UserProfile = new Mongo.Collection('UserProfile', {idGeneration: 'MONGO'});
 