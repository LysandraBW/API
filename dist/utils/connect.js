"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = connect;
function connect(A, B, joinKey, linkKey) {
    const connection = {};
    for (const b of B) {
        let ID = b[joinKey];
        if (!connection[ID])
            connection[ID] = [];
        connection[ID].push(b);
    }
    for (let i = 0; i < A.length; i++) {
        let ID = A[i][joinKey];
        A[i][linkKey] = connection[ID] || [];
    }
}
