import React from 'react'
import { Tabs, Tab, Modal, Media, Popover, OverlayTrigger, Button } from 'react-bootstrap';
import YouTube from 'react-youtube';

const Post = () => {

    const opts = {
        width: '100%',
        playerVars:{
            autoplay: 0,
        }
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Popover right</Popover.Title>
            <Popover.Content>
            And here's some <strong>amazing</strong> content. It's very engaging.
            right?
            </Popover.Content>
        </Popover>
    );

    return (
        <Modal.Dialog className="mb-0">
            <Media className="px-2 pt-1">
                    <img
                        width={45}
                        height={45}
                        className="mr-3 rounded" 
                        src="https://source.unsplash.com/random"
                        alt="Generic placeholder"
                    />
                    <Media.Body>
                        <div class="d-flex flex-column">
                        <b>Profile Owner</b>
                        <small>Date</small>
                        </div>
{/*                         
                        <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                            <Button variant="success">Click me to see</Button>
                        </OverlayTrigger> */}
                    </Media.Body>
            </Media>
            <Modal.Header className="px-2 py-0">
                <p className="mb-0">Post Title</p>
            </Modal.Header>
            <Tabs defaultActiveKey="video" transition={false} id="post-tab">
                <Tab eventKey="video" title="Video"> 
                    <YouTube videoId="Tn6-PIqc4UM" opts={opts} />
                </Tab>
                <Tab eventKey="file" title="files">
                    <h2>Test2</h2>
                </Tab>
            </Tabs>
            <Modal.Footer className="p-1">
                <p>Model Footer Here</p>
            </Modal.Footer>
        </Modal.Dialog>
    )
}

export default Post
