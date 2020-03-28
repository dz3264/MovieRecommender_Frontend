import React from 'react';
import '../styles/Component.css';
import Pagination from "react-bootstrap/Pagination";


class PageNumbers extends React.Component{
    render() {
        console.log("current page "+this.props.curr);
        console.log("last page "+this.props.last);
        let pageNums = [];
        if(this.props.last <= 10){

            let pages = [];
            for (var i = 1; i <= this.props.last; i++) {
                if (i === this.props.curr){
                    pages.push(<Pagination.Item active >{this.props.curr}</Pagination.Item>);
                }
                else{
                    let j = i;
                    pages.push(<Pagination.Item onClick={()=>this.props.changePage(j)} >{j}</Pagination.Item>);
                }
            }
            pageNums = <Pagination>
                {pages}
            </Pagination>
        }
        else if(this.props.curr === 1){
            let elli = this.props.last-this.props.curr > 10 ? this.props.curr+10 : this.props.last;
            pageNums = <Pagination>
                <Pagination.First disabled onClick={()=>this.props.changePage(1)}/>
                <Pagination.Prev disabled onClick={()=>this.props.changePage(this.props.curr-1)}/>
                <Pagination.Item active >{1}</Pagination.Item>

                <Pagination.Item onClick={()=>this.props.changePage(2)}>{2}</Pagination.Item>
                <Pagination.Item onClick={()=>this.props.changePage(3)}>{3}</Pagination.Item>
                <Pagination.Item onClick={()=>this.props.changePage(4)}>{4}</Pagination.Item>
                <Pagination.Item onClick={()=>this.props.changePage(5)}>{5}</Pagination.Item>

                <Pagination.Ellipsis onClick={()=>this.props.changePage(elli)}/>
                <Pagination.Item onClick={()=>this.props.changePage(this.props.last)}>{this.props.last}</Pagination.Item>
                <Pagination.Next onClick={()=>this.props.changePage(this.props.curr+1)}/>
                <Pagination.Last onClick={()=>this.props.changePage(this.props.last)}/>
            </Pagination>
        }else if(this.props.curr === this.props.last){
            let elli = this.props.curr > 10 ? this.props.curr-10 : 1;
            pageNums = <Pagination>
                <Pagination.First onClick={()=>this.props.changePage(1)}/>
                <Pagination.Prev onClick={()=>this.props.changePage(this.props.curr-1)}/>
                <Pagination.Item onClick={()=>this.props.changePage(1)}>1</Pagination.Item>
                <Pagination.Ellipsis onClick={()=>this.props.changePage(elli)}/>

                <Pagination.Item onClick={()=>this.props.changePage(this.props.last-4)}>{this.props.last-4}</Pagination.Item>
                <Pagination.Item onClick={()=>this.props.changePage(this.props.last-3)}>{this.props.last-3}</Pagination.Item>
                <Pagination.Item onClick={()=>this.props.changePage(this.props.last-2)}>{this.props.last-2}</Pagination.Item>
                <Pagination.Item onClick={()=>this.props.changePage(this.props.last-1)}>{this.props.last-1}</Pagination.Item>

                <Pagination.Item active >{this.props.last}</Pagination.Item>
                <Pagination.Next disabled/>
                <Pagination.Last disabled/>
            </Pagination>
        }
        else if(this.props.curr < 5){
            let pages = [];
            for (var i = 1; i <= 5; i++) {
                if (i === this.props.curr){
                    pages.push(<Pagination.Item active >{this.props.curr}</Pagination.Item>);
                }
                else{
                    let j = i;
                    pages.push(<Pagination.Item onClick={()=>this.props.changePage(j)} >{j}</Pagination.Item>);
                }
            }
            let elli = this.props.last - this.props.curr > 10 ? this.props.curr+10 : this.props.last;
            pageNums = <Pagination>
                <Pagination.First onClick={()=>this.props.changePage(1)}/>
                <Pagination.Prev onClick={()=>this.props.changePage(this.props.curr-1)}/>
                {pages}
                <Pagination.Ellipsis onClick={()=>this.props.changePage(elli)}/>
                <Pagination.Item onClick={()=>this.props.changePage(this.props.last)}>{this.props.last}</Pagination.Item>
                <Pagination.Next onClick={()=>this.props.changePage(this.props.curr+1)}/>
                <Pagination.Last onClick={()=>this.props.changePage(this.props.last)}/>
            </Pagination>
        }else if(this.props.curr >= this.props.last-3){
            let pages = [];
            for (var i = this.props.last-5; i <= this.props.last; i--) {
                if (i === this.props.curr){
                    pages.push(<Pagination.Item active >{this.props.curr}</Pagination.Item>);
                }
                else{
                    let j = i;
                    pages.push(<Pagination.Item onClick={()=>this.props.changePage(j)} >{j}</Pagination.Item>);
                }
            }
            let elli = this.props.curr  > 10 ? this.props.curr-10 : 1;
            pageNums = <Pagination>
                <Pagination.First onClick={()=>this.props.changePage(1)}/>
                <Pagination.Prev onClick={()=>this.props.changePage(this.props.curr-1)}/>
                <Pagination.Ellipsis onClick={()=>this.props.changePage(elli)}/>
                {pages}
                <Pagination.Item onClick={()=>this.props.changePage(this.props.last)}>{this.props.last}</Pagination.Item>
                <Pagination.Next onClick={()=>this.props.changePage(this.props.curr+1)}/>
                <Pagination.Last onClick={()=>this.props.changePage(this.props.last)}/>
            </Pagination>
        } else{
            let elli_pre = this.props.curr  > 10 ? this.props.curr-10 : 1;
            let elli_nxt = this.props.last -this.props.curr  > 10 ? this.props.curr+10 : this.props.last;
            pageNums = <Pagination>
                <Pagination.First onClick={()=>this.props.changePage(1)}/>
                <Pagination.Prev onClick={()=>this.props.changePage(this.props.curr-1)}/>
                <Pagination.Item onClick={()=>this.props.changePage(1)}>{1}</Pagination.Item>
                <Pagination.Ellipsis onClick={()=>this.props.changePage(elli_pre)}/>

                <Pagination.Item onClick={()=>this.props.changePage(this.props.curr-2)}>{this.props.curr-2}</Pagination.Item>
                <Pagination.Item onClick={()=>this.props.changePage(this.props.curr-1)}>{this.props.curr-1}</Pagination.Item>
                <Pagination.Item active>{this.props.curr}</Pagination.Item>
                <Pagination.Item onClick={()=>this.props.changePage(this.props.curr+1)}>{this.props.curr+1}</Pagination.Item>
                <Pagination.Item onClick={()=>this.props.changePage(this.props.curr+2)}>{this.props.curr+2}</Pagination.Item>

                <Pagination.Ellipsis onClick={()=>this.props.changePage(elli_nxt)}/>
                <Pagination.Item onClick={()=>this.props.changePage(this.props.last)}>{this.props.last}</Pagination.Item>
                <Pagination.Next onClick={()=>this.props.changePage(this.props.curr+1)}/>
                <Pagination.Last onClick={()=>this.props.changePage(this.props.last)}/>
            </Pagination>
        }

        return <div className="Pageturning">
            {pageNums}
        </div>;
    }

}

export default PageNumbers;
