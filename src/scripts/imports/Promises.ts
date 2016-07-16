/// <reference path="../../../vendor/typings/index.d.ts" />
import {Promise, Deferred, defer, allSettled, all}  from 'q';

const deferred:Deferred<any> = defer();
deferred.resolve(null);
const resolvedPromise:Promise<any> = deferred.promise;

export {resolvedPromise, Promise, Deferred, defer, allSettled, all}
