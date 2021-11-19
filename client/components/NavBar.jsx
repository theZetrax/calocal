import Link from 'next/link'

// UI
import { Tooltip, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import styles from './NavBar.module.css'

const NavBar = () => (
  <nav class={styles.nav}>
    <img src="/assets/calocal.svg" height={32} />

    <Link href="/account">
      <Tooltip
        title="Your Account Settings are Here."
        mouseEnterDelay={1}
        placement="bottom"
      >
        <Button type="default" shape="round" size="middle">
          <UserOutlined />
          Account Setting
        </Button>
      </Tooltip>
    </Link>
  </nav>
)

export default NavBar
