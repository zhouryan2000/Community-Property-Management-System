import React from "react";
import { Card } from 'antd';
import { Avatar, List } from 'antd';

/* function Dashboard(props) {
    return <h2 align="left">Dashboard</h2>
} */
const data = [
    {
      title: 'Announcement 1',
      publisher: 'Anna',
      date: '03/25/2022',
      content: 'This is announcement 1 content. '
    },
    {
      title: 'Announcement 2',
      publisher: 'Bob',
      date: '03/25/2022',
      content: 'This is announcement 2 content. '
    },
    {
      title: 'Announcement 3',
      publisher: 'Cindy',
      date: '09/19/2022',
      content: 'This is announcement 3 content. '
    },
    {
      title: 'Announcement 4',
      publisher: 'David',
      date: '09/20/2022',
      content: 'This is announcement 4 content. '
    },
  ];


const Dashboard = () => (
  <>
  <h2 class="font-weight-bold border-bottom pb-3 mt-3 mb-0 pr-5">Announcements</h2>
    {/*<List*/}
    {/*    grid={{ gutter: 16, column: 4 }}*/}
    {/*    dataSource={data}*/}
    {/*    renderItem={item => (*/}
    {/*    <List.Item>*/}
    {/*        <Card */}
    {/*            title={item.title}*/}
    {/*            extra={<a href="#">More</a>}*/}
    {/*            style={{*/}
    {/*                width: 300,*/}
    {/*            }}*/}
    {/*            cover={*/}
    {/*                <img*/}
    {/*                  alt="example"*/}
    {/*                  src="https://i.postimg.cc/NfyFDztx/pexels-michael-tuszynski-2157404.jpg"*/}
    {/*                />*/}
    {/*              }*/}
    {/*              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}*/}
    {/*            >*/}
    {/*            <p>{item.content}</p>*/}
    {/*            <p>by {item.publisher}</p>*/}
    {/*            <p>on {item.date}</p>*/}
    {/*        </Card>*/}
    {/*    </List.Item>*/}
    {/*    )}*/}
    {/*/>*/}
  </>
);



export default Dashboard;