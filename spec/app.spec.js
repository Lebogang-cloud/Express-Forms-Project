const Visitors =require("../src/express");
const Table = require("../src/table")
let visitor= new Visitors(
    1,
    'Romeo',
    'Ricky',
    24,
    '2020-02-03',
    '00:01',
    'He is smart'
);

let teboho = new Visitors(
    1,
    'Romeo',
    'Ricky',
    24,
    '2020-02-03',
    '00:01',
    'He is smart'
);


describle("Visitor's", () => {
    it("should check if addNewVisitor has been defined", () =>{
        expect(visitor.addNewVisitor).toBeDefined();
    });

    it("should check if createTable has been defined", () =>{
        expect(visitor.createTable).toBeDefined();
    });
});
    
describle("check if methods/ functions adds a visitor", () => {
    it("should spy on addNewVisitor", () => { 
        spyon(visitor.addNewVisitor);
    });

    it("should spy on addNewVisitor", () => { 
        spyon(teboho.addNewVisitor);
    });
});