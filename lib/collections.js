import {Mongo} from 'meteor/mongo';

export const Agents = new Mongo.Collection('Agent', {idGeneration: 'MONGO'});
export const Skills = new Mongo.Collection('Skill', {idGeneration: 'MONGO'});
export const ServiceType = new Mongo.Collection('ServiceType', {idGeneration: 'MONGO'});
export const ServiceDuration = new Mongo.Collection('ServiceDuration', {idGeneration: 'MONGO'});
export const State = new Mongo.Collection('State', {idGeneration: 'MONGO'});
