export function connect<ElementA extends {}, ElementB extends {}>(A: Array<ElementA>, B: Array<ElementB>, joinKey: keyof ElementA & keyof ElementB, linkKey: keyof ElementA): void {    
    const connection: {[ID: string | number]: Array<ElementB>} = {};
    
    for (const b of B) {
        let ID = <number> b[joinKey];
        if (!connection[ID])
            connection[ID] = [];
        connection[ID].push(b);
    }

    for (let i = 0; i < A.length; i++) {
        let ID = <number> A[i][joinKey];
        A[i][linkKey] = <any> connection[ID] || [];
    }
}