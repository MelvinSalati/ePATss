{
  searchResults.length > 0 ? (
    <>
      <div style={{ padding: 20 }}>
        <IconButton
          style={{
            float: 'right',
          }}
          size={'sm'}
          icon={<ArowBackIcon />}
          appearance={'primary'}
          onClick={() => {
            setSearchResults(false)
          }}
        >
          {' '}
          Back to search{' '}
        </IconButton>
        <FilterableTable
          namespace="People"
          loadingMessage="Please wait.."
          initialSort="name"
          data={searchResults}
          fields={resultsTableFields}
          noRecordsMessage="There are no people to display"
          noFilteredRecordsMessage="No people match your filters!"
          topPagerVisible={false}
          pagerVisible={false}
          pageSize={6}
          pageSizes={6}
        />
      </div>
    </>
  ) : (
    <>
      {/*    No search results    */}
      <FlexboxGrid style={{ backgroundColor: '#FFF', height: '100%' }}>
        <FlexboxGrid.Item colspan={12} style={{ marginTop: 70 }}>
          <FlexboxGrid>
            <FlexboxGrid.Item colspan={24} className="menuLeft">
              <div className="options">
                <div className="optionTitle">Remote Access</div>
                <div className="optionBody">
                  <p className="optionText">
                    For patients seeking medical assitance
                  </p>
                  {/*  toggle switch for rsuite*/}
                  <Toggle
                    checked={remoteAccessEnabled}
                    onChange={handleToggle}
                    style={{
                      width: '100px', // Adjust the width as needed
                      borderRadius: '8px', // Adjust the border radius as needed
                      backgroundColor: remoteAccessEnabled
                        ? '#fbfbfb'
                        : '#fbfbfb',
                      padding: '10px',
                    }}
                    size="lg" // Adjust the size (lg: large, md: medium, sm: small)
                    checkedChildren="Yes" // Text displayed when toggle is on
                    unCheckedChildren="No" // Text displayed when toggle is off
                  />
                </div>
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={24}>
              <FlexboxGrid>
                <FlexboxGrid.Item colspan={24} className="menuLeft">
                  <div className="options">
                    <div className="optionTitle">Add Recipient</div>
                    <div className="optionBody">
                      <p className="optionText">
                        For patients newly enrolled into Hiv Prevention and
                        Treatment
                      </p>
                      {/*  toggle switch for rsuite*/}
                      <IconButton size={'sm'} icon={<PeoplesIcon />}>
                        {' '}
                        Import From SC+
                      </IconButton>
                      <IconButton
                        size={'sm'}
                        onClick={registrationModalHandler}
                        style={{
                          float: 'right',
                          backgroundColor: '#000',
                          color: '#FFF',
                        }}
                        icon={
                          <PeoplesIcon
                            color="white"
                            style={{ backgroundColor: '#000' }}
                          />
                        }
                      >
                        {' '}
                        Add{' '}
                      </IconButton>
                    </div>
                  </div>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </FlexboxGrid.Item>
        {/*search inputs*/}
        <FlexboxGrid.Item
          colspan={12}
          style={{ margin: 'auto', borderLeft: '1px solid #DDD', padding: 10 }}
        >
          <FlexboxGrid>
            <FlexboxGrid.Item colspan={24}>
              {' '}
              <div
                style={{
                  padding: 10,
                  backgroundColor: 'inherit',
                  fontSize: 14,
                  fontWeight: 100,
                }}
              >
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: '#000',
                    padding: 10,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{
                      fontSize: 20,
                      backgroundColor: '#fff',
                      borderRadius: 10,
                    }}
                    color={'#007aff'}
                  />{' '}
                  Registered in ePATS{' '}
                </h3>
                <Button
                  appearance={'default'}
                  size="sm"
                  style={{ marginBottom: 10, float: 'right' }}
                >
                  {' '}
                  <FontAwesomeIcon icon={faFingerprint} /> Bio Search
                </Button>
              </div>{' '}
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={12}>
              <InputGroup
                inside
                style={{ marginBottom: 40, width: 230 }}
                size="lg"
              >
                <Input
                  placeholder="First name"
                  name="search"
                  onChange={(text) => {
                    setSearchText(text)
                  }}
                />
                <InputGroup.Button>
                  <PeoplesIcon />
                </InputGroup.Button>
              </InputGroup>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={12}>
              <InputGroup
                inside
                style={{ marginBottom: 40, width: 230 }}
                size="lg"
              >
                <Input
                  placeholder="Last name"
                  className="search"
                  onChange={(text) => {
                    setSearchText(text)
                  }}
                />
                <InputGroup.Button>
                  <PeoplesIcon />
                </InputGroup.Button>
              </InputGroup>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={12}>
              <InputGroup
                inside
                style={{ marginBottom: 40, width: 230 }}
                size="lg"
              >
                <Input
                  placeholder="Service ID/VMMC/TB/ART"
                  className="search"
                  onChange={(text) => {
                    setSearchText(text)
                  }}
                />
                <InputGroup.Button>
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Button>
              </InputGroup>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={12}>
              <InputGroup
                inside
                style={{ marginBottom: 40, width: 230 }}
                size="lg"
              >
                <Input
                  placeholder="Nupn"
                  className="search"
                  onChange={(text) => {
                    setSearchText(text)
                  }}
                />
                <InputGroup.Button>
                  <PeoplesIcon />
                </InputGroup.Button>
              </InputGroup>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={12}>
              <InputGroup
                inside
                style={{ marginBottom: 40, width: 230 }}
                size="lg"
              >
                <Input
                  placeholder="NRC"
                  className="search"
                  onChange={(text) => {
                    setSearchText(text)
                  }}
                />
                <InputGroup.Button>
                  <FontAwesomeIcon icon={faIdCardClip} />
                </InputGroup.Button>
              </InputGroup>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={12}>
              <InputGroup
                inside
                style={{ marginBottom: 40, width: 230 }}
                size="lg"
              >
                <Input
                  placeholder="Mobile phone number"
                  className="search"
                  onChange={(text) => {
                    setSearchText(text)
                  }}
                />
                <InputGroup.Button>
                  <FontAwesomeIcon icon={faPhone} />
                </InputGroup.Button>
              </InputGroup>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={24}>
              <Button
                appearance={'primary'}
                size={'sm'}
                style={{ float: 'right', marginTop: 20, marginRight: 24 }}
                loading={searchProcess}
                onClick={searchHandler}
              >
                {' '}
                Submit{' '}
              </Button>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      {/*        ADDD NEW patients*/}

      <Modal
        size={'md'}
        open={openRegistrationModal}
        onClose={() => {
          registrationModalHandler(false)
        }}
      >
        <Modal.Header
          style={{ paddingBottom: 15, borderBottom: '1px solid #ddd' }}
        >
          <Modal.Title style={{ fontWeight: 600 }}>
            Patient Registration
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: 0, height: 600 }}>
          <FlexboxGrid>
            <FlexboxGrid.Item colspan={12}>
              <div className="formGroup">
                <Input
                  type="text"
                  placeholder="first name"
                  size="lg"
                  onChange={(text) => {
                    setFirstName(text)
                  }}
                />
              </div>
              <div className="formGroup">
                <SelectPicker
                  data={data}
                  style={{ width: '100%' }}
                  size="lg"
                  placeholder="Pick Gender"
                  onChange={(text) => {
                    setGender(text)
                  }}
                />
              </div>
              <div className="formGroup">
                <Input
                  type="text"
                  placeholder="Mobile Phone  Number"
                  size="lg"
                  onChange={(text) => {
                    setMobile(text)
                  }}
                />
              </div>
              <div className="formGroup" style={{ marginTop: 50 }}>
                <SelectPicker
                  data={languageOption}
                  style={{ width: '100%' }}
                  size="lg"
                  placeholder="Language"
                  onChange={(text) => {
                    setLanguage(text)
                  }}
                />
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={12}>
              <div className="formGroup">
                <Input
                  type="text"
                  placeholder="Surname"
                  size="lg"
                  onChange={(text) => {
                    setSurname(text)
                  }}
                />
              </div>
              <div className="formGroup">
                <Input
                  type="date"
                  size="lg"
                  onChange={(text) => {
                    setDateOfBirth(text)
                  }}
                />
              </div>
              <div className="formGroup">
                <Input
                  type="email"
                  placeholder="Email address"
                  size="lg"
                  onChange={(text) => {
                    setEmail(text)
                  }}
                />
              </div>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={24}>
              <div className="formGroup">
                <Input
                  as="textarea"
                  rows={3}
                  placeholder="A complete address "
                  onChange={(text) => {
                    setAddress(text)
                  }}
                />
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="subtle">Cancel</Button>
          <Button
            size="sm"
            appearance="primary"
            onClick={registrationHandler}
            loading={process}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
