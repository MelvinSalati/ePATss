import React, { useState, useEffect } from 'react';
import { Navigation } from 'renderer/components';
import BranchIcon from '@rsuite/icons/Branch';
import FilterableTable from 'react-filterable-table';
import Notiflix from 'Notiflix'; // Ensure correct import path
import Http from '../../../Http/Http';
import { FlexboxGrid, IconButton, Button, Modal, Input } from 'rsuite';
import authorizeAccess from '../../../Functions/authorizeAccess'; // Ensure correct import path
import routes from '../../../Routes/URLs'

const streamsTableFields = [
  { inputFilterable: false, displayName: 'SN', name: 'sn' },
  { inputFilterable: false, displayName: 'Stream', name: 'stream_name' },
  { inputFilterable: false, displayName: 'Date Stream Started', name: 'created_at' }
];

export function StreamsScreen() {
  const [streamName, setStreamName] = useState('');
  const [streams, setStreams] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const [triggerReload, setTriggerReload] = useState(0);

  const openModal = (state) => setModalOpen(state);
  const handleStreamChange = (text) => setStreamName(text);

  // fetch streams
  async function fetchStreams () {
      try {
        const response = await Http.get(routes.streams.list);
        setStreams(response.data);
      } catch (error) {
        // Handle the error (e.g., display an error message)
        console.error(error);
      }
  }

  const createStream = async () => {
    if (streamName.length === 0) {
      return Notiflix.Notify.failure('Stream name is required!!');
    }

    setProcessing(true);

    try {
      await Http.post(routes.streams.create, { stream: streamName, user: localStorage.getItem('user_id') });
      Notiflix.Notify.success('Stream created successfully!');
      openModal(false);
      fetchStreams();
      return ;

    } catch (error) {
      Notiflix.Notify.failure('Sorry, there is an issue! Try again or contact the administrator');
      // Log the error for further investigation
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
      fetchStreams();
  }, [triggerReload]);

  return (
    <>
      <Navigation />
      <div className="container">
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={12}>
            <h3>Streams</h3>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={12}>
            <IconButton appearance="primary" size="xs" style={{float: 'right'}} icon={<BranchIcon />} onClick={() => openModal(true)}>
              Create Stream
            </IconButton>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={24}>
            <FilterableTable
              fields={streamsTableFields}
              data={streams}
              pageSizes={6}
              pagerTopVisible={false}
              noRecordsMessage="There are no streams to display"
              noFilteredRecordsMessage="No streams match your filters!"
              topPagerVisible={false}
              pagerVisible={false}
              pageSize={6}
              pageSizes={6}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>

        {/* Modal to create a stream */}
        <Modal open={isModalOpen} onClose={() => openModal(false)}>
          <Modal.Header>
            <h5 className="text-secondary">
              <BranchIcon /> Create Stream
            </h5>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Input type="text" onChange={(text) => handleStreamChange(text)} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button appearance="primary" onClick={createStream} loading={isProcessing}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
