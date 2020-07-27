export { Trie }

class TrieNode{
    constructor(){
        this.children = Array(10).fill(null);    // For a 10 Digit number
        this.parent = null; //For a Backspace : Pointer can move to parent of current Node
    }
}

class ContactNode{
    constructor(name,number,parent){
        this.name = name;
        this.number = number;
        this.parent = parent;
    }
}

class Trie{
    constructor(){
        this.root = new TrieNode();
        this.current = this.root;
        let init = [
            ["Abhishek","123456"],
            ["Ram","123457"],
            ["Shyam","124356"],
            ["Rohan","123465"]
        ];
        
        for(let i=0;i<init.length;i++){
            this.add(init[i][1],init[i][0],0);
        }
    }
    
    add(number,name,pos=0,node=this.root){  //Pos is the depth of the current number
        if(pos===number.length-1){
            node.children[number[pos]-'0'] = new ContactNode(name,number,node);
            return;
        }
        if(node.children[number[pos]-'0']===null){
            let newNode = new TrieNode();
            node.children[number[pos]-'0'] = newNode;
            newNode.parent = node;
        }
        this.add(number,name,pos+1,node.children[number[pos]-'0']);
    }
    
    findAll(node){
        if(node===null){
            return;
        }
        if(node instanceof ContactNode){
            this.result.push(node);
            return;
        }
        for(let i=0;i<10;i++){
            this.findAll(node.children[i]);
        }
    }
    
    findNext(step){
        if(step===-1){
            this.current = this.current.parent;
        }
        else if(step!==-2){
            if(this.current.children[step-'0']===null){
                let newnode = new TrieNode();
                this.current.children[step-'0'] = newnode;
                newnode.parent = this.current;
            }
            this.current = this.current.children[step-'0'];
        }
        this.result = [];
        this.findAll(this.current);
        return this.result;
    }
    
    del(number,pos=0,node=this.root){
        if(pos===number.length-1){
            node.children[number[pos]-'0'] = null;
            return;
        }
        if(node.children[number[pos]-'0']===null){
            return;
        }
        this.del(number,pos+1,node.children[number[pos]-'0']);
    }
    
}
