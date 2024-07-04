import React from 'react'
import dynamic from 'next/dynamic';
 const PostPage = () => {
    const CompanyPostsComponent = dynamic(() => import('@/components/hire-talent/Posts'), {
        ssr: false, // Disable server-side rendering for this component
      });
  return (
    <div>
 <CompanyPostsComponent/>
    </div>
  )
}

export default PostPage
