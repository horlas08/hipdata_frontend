import { Container } from '@/components/shared'
import { Card } from '@/components/ui'
import React from 'react'
// import ActionBar from './ActionBar'
import ProjectListContent from './ProjectListContent'

export default function Level() {
  return (
    <Container className="h-full">
        {/* <ActionBar /> */}
        <ProjectListContent />
       
    </Container>
)
}
