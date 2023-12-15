import React, { useEffect, useState } from 'react'
import { FlexboxGrid, Button, IconButton, Input, InputGroup } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'

export function AuthenticationScreen() {
  return <>
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={12}>
      </FlexboxGrid.Item>
      <InputGroup>
        <Input placeholder='email' />
        <Input.Button>
          <Button appearance='primary'>Submit</Button>
        </Input.Button>
      </InputGroup>
      <FlexboxGrid.Item colspan={12}>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </>
}
