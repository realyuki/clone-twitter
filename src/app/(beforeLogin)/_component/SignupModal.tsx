'use client'

import { useFormState, useFormStatus } from 'react-dom'
import onSubmit from '../_lib/signup'
import BackButton from './BackButton'

function showMessage(msg: string | undefined | null) {
  if (msg === 'no_id') {
    return '아이디를 입력하세요.'
  }
  if (msg === 'no_name') {
    return '닉네임을 입력하세요.'
  }
  if (msg === 'no_password') {
    return '비밀번호를 입력하세요.'
  }
}

export default function SignupModal() {
  const [state, formAction] = useFormState(onSubmit, {
    message: null
  })
  const { pending } = useFormStatus()

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-dimmed">
      <div className="h-650 max-h-[90vh] min-h-400 min-w-600 max-w-[80vw] shrink-[1] rounded-16 bg-black p-80">
        <form action={formAction}>
          <BackButton />
          <div className="my-20 font-bold text-lg">Create your account</div>
          <div className="my-12">
            <input
              type="text"
              className="input"
              id="id"
              placeholder="id"
              name="id"
              required
            />
          </div>
          <div className="my-12">
            <input
              type="text"
              className="input"
              id="name"
              placeholder="name"
              name="name"
              required
            />
          </div>
          <div className="my-12">
            <input
              type="password"
              className="input"
              id="password"
              placeholder="password"
              name="password"
              required
            />
          </div>
          <div className="my-12">
            <input
              type="file"
              className="input"
              id="image"
              placeholder="image"
              name="image"
              required
            />
          </div>
          <div>
            <button
              className="button h-[50px] w-[100%] max-w-[100%] bg-white text-[#051419]"
              type="submit"
            >
              Next
            </button>
            <p className="text-[red]">{showMessage(state?.message)}</p>
          </div>
        </form>
      </div>
    </div>
  )
}
