const sqlite3 = require('sqlite3').verbose();
const async = require('async');
const axios = require('axios');

module.exports = class Jobs {
    constructor(uploadApiUrl) {
        this.uploadApiUrl = uploadApiUrl;
    }

    do() {
        const db = new sqlite3.Database('../plugins/Jobs/jobs.sqlite.db');
        db.serialize(() => {
            async.series({
                points: (callback) => {
                    db.all(
                        "select username, totalpoints from points"
                        + " join users on points.userid = users.id"
                        + " where totalpoints > 0"
                        + " order by totalpoints desc;",
                        callback
                    );
                },
                ranks: (callback) => {
                    async.waterfall([
                        (callback_jobNames) => {
                            db.all(
                                'select * from jobNames',
                                callback_jobNames
                            )
                        },
                        (jobs, callback_jobs) => {
                            async.map(jobs, (job, callback_job) => {
                                db.all(
                                    "select username, name, level from jobs" +
                                    "    join users on jobs.userid = users.id" +
                                    "    join jobNames on jobs.jobid = jobNames.id" +
                                    "    where jobs.jobid = " + job.id +
                                    "    order by level desc;",
                                    callback_job
                                );
                            }, (err, results) => {
                                const ret = {}
                                for (let item of results) {
                                    if (item.length === 0) {
                                        continue;
                                    }
                                    ret[item[0].name] = item
                                }
                                callback_jobs(err, ret)
                            })
                        },
                    ], callback)
                }
            }, (err, results) => {
                axios.post(this.uploadApiUrl, {name: 'jobs_rank.json', data: results.ranks}).catch(console.error)
                axios.post(this.uploadApiUrl, {name: 'jobs_point.json', data: results.points}).catch(console.error)
                // console.log(JSON.stringify(results, null, '  '));
                db.close();
            })
        });
    }
};


